// AFC School Finder - JavaScript

let allSchools = [];
let filteredSchools = [];

// DOM Elements
const nameSearchInput = document.getElementById('name-search');
const stateFilterSelect = document.getElementById('state-filter');
const postalCodeInput = document.getElementById('postal-code-filter');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsContainer = document.getElementById('results-container');
const resultsCount = document.getElementById('results-count');
const loadingIndicator = document.getElementById('loading-indicator');
const noResults = document.getElementById('no-results');
const statsummary = document.getElementById('stats-summary');

// Load schools data on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadSchools();
    populateStateFilter();
    setupEventListeners();
});

// Load schools from API
async function loadSchools() {
    try {
        showLoading(true);
        const response = await fetch('/api/schools');
        allSchools = await response.json();
        
        // Update stats
        if (statsummary) {
            const states = new Set(allSchools.map(s => s.address?.state).filter(Boolean));
            statsummary.textContent = `${allSchools.length.toLocaleString()} schools across ${states.size} states`;
        }
        
        showLoading(false);
        console.log(`✓ Loaded ${allSchools.length} schools`);
    } catch (error) {
        console.error('Error loading schools:', error);
        showLoading(false);
        if (statsummary) {
            statsummary.textContent = 'Error loading school data';
        }
    }
}

// Populate state filter dropdown
function populateStateFilter() {
    if (!stateFilterSelect) return;
    
    // Get unique states
    const states = {};
    allSchools.forEach(school => {
        const state = school.address?.state;
        if (state) {
            states[state] = (states[state] || 0) + 1;
        }
    });
    
    // Sort states alphabetically
    const sortedStates = Object.keys(states).sort();
    
    // Add options
    sortedStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = `${state} (${states[state].toLocaleString()})`;
        stateFilterSelect.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search button
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
    
    // Enter key on inputs
    [nameSearchInput, postalCodeInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    });
    
    // Real-time filtering for name search
    if (nameSearchInput) {
        let debounceTimer;
        nameSearchInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (nameSearchInput.value.length >= 2 || nameSearchInput.value.length === 0) {
                    performSearch();
                }
            }, 300);
        });
    }
    
    // State filter change
    if (stateFilterSelect) {
        stateFilterSelect.addEventListener('change', performSearch);
    }
}

// Perform search with current filters
function performSearch() {
    const nameQuery = nameSearchInput?.value.toLowerCase().trim() || '';
    const stateFilter = stateFilterSelect?.value || '';
    const postalCodeFilter = postalCodeInput?.value.trim() || '';
    
    // Filter schools
    filteredSchools = allSchools.filter(school => {
        // Name filter (search in name and city)
        if (nameQuery) {
            const nameMatch = school.name?.toLowerCase().includes(nameQuery);
            const cityMatch = school.address?.city?.toLowerCase().includes(nameQuery);
            if (!nameMatch && !cityMatch) return false;
        }
        
        // State filter
        if (stateFilter && school.address?.state !== stateFilter) {
            return false;
        }
        
        // Postal code filter
        if (postalCodeFilter) {
            const schoolPostalCode = school.address?.postalCode || '';
            if (!schoolPostalCode.startsWith(postalCodeFilter)) {
                return false;
            }
        }
        
        return true;
    });
    
    displayResults();
}

// Display search results
function displayResults() {
    if (!resultsContainer || !resultsCount) return;
    
    // Update count
    if (filteredSchools.length === 0) {
        resultsCount.textContent = 'No schools found';
        resultsContainer.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
    } else {
        resultsCount.textContent = `Found ${filteredSchools.length.toLocaleString()} school${filteredSchools.length === 1 ? '' : 's'}`;
        if (noResults) noResults.style.display = 'none';
        renderSchoolCards();
    }
}

// Render school cards
function renderSchoolCards() {
    if (!resultsContainer) return;
    
    // Limit to first 100 results for performance
    const displaySchools = filteredSchools.slice(0, 100);
    
    resultsContainer.innerHTML = displaySchools.map(school => createSchoolCard(school)).join('');
    
    if (filteredSchools.length > 100 && resultsCount) {
        resultsCount.textContent = `Showing first 100 of ${filteredSchools.length.toLocaleString()} schools - refine your search for more specific results`;
    }
}

// Create HTML for a school card
function createSchoolCard(school) {
    const address = school.address || {};
    const location = [address.city, address.state].filter(Boolean).join(', ');
    const rating = school.rating;
    
    return `
        <div class="school-card" onclick="window.location.href='/school/${school.slug}'">
            <div class="school-card-header">
                <h3 class="school-card-name">${escapeHtml(school.name)}</h3>
                ${location ? `
                    <div class="school-card-location">
                        <span>📍</span>
                        <span>${escapeHtml(location)}</span>
                    </div>
                ` : ''}
            </div>
            
            <div class="school-card-details">
                ${school.gradeRange ? `
                    <div class="school-card-detail">
                        <strong>Grades:</strong> ${escapeHtml(school.gradeRange)}
                    </div>
                ` : ''}
                
                ${school.totalEnrollment ? `
                    <div class="school-card-detail">
                        <strong>Enrollment:</strong> ${school.totalEnrollment.toLocaleString()} students
                    </div>
                ` : ''}
                
                ${rating ? `
                    <div class="school-card-detail">
                        <strong>Rating:</strong> ${'⭐'.repeat(Math.round(rating.value))} ${rating.value}/5
                    </div>
                ` : ''}
                
                ${address.postalCode ? `
                    <div class="school-card-detail">
                        <strong>ZIP:</strong> ${escapeHtml(address.postalCode)}
                    </div>
                ` : ''}
            </div>
            
            <div class="school-card-footer">
                <a href="/school/${school.slug}" class="view-school-btn" onclick="event.stopPropagation()">
                    Send ${escapeHtml(school.name)} your free tax credit dollars
                </a>
            </div>
        </div>
    `;
}

// Clear all filters
function clearFilters() {
    if (nameSearchInput) nameSearchInput.value = '';
    if (stateFilterSelect) stateFilterSelect.value = '';
    if (postalCodeInput) postalCodeInput.value = '';
    
    filteredSchools = [];
    if (resultsContainer) resultsContainer.innerHTML = '';
    if (resultsCount) resultsCount.textContent = 'Enter search criteria to find schools';
    if (noResults) noResults.style.display = 'none';
}

// Show/hide loading indicator
function showLoading(show) {
    if (loadingIndicator) {
        loadingIndicator.style.display = show ? 'block' : 'none';
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Analytics helper (optional)
function trackSearch(filters) {
    console.log('Search performed:', filters);
    // Add analytics tracking here if needed
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}


