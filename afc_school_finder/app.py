#!/usr/bin/env python3
"""
AFC School Finder - Flask Application
Enables donors to search for schools and contribute via ECCA program
"""

from flask import Flask, render_template, jsonify, request
import json
from pathlib import Path
from typing import List, Dict, Any


app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# Load schools data
SCHOOLS_DATA_PATH = Path(__file__).parent / 'public' / 'data' / 'schools.json'
schools_data: List[Dict[str, Any]] = []


def load_schools():
    """Load schools data from JSON file"""
    global schools_data
    try:
        with open(SCHOOLS_DATA_PATH, 'r', encoding='utf-8') as f:
            schools_data = json.load(f)
        print(f"✓ Loaded {len(schools_data)} schools")
    except FileNotFoundError:
        print(f"⚠ Schools data not found at {SCHOOLS_DATA_PATH}")
        print("  Run process_schools.py first to generate the data file")
        schools_data = []


# Load schools data at module import
load_schools()


# Create slug-to-school index for fast lookups
def get_school_by_slug(slug: str) -> Dict[str, Any]:
    """Get school by its URL slug"""
    for school in schools_data:
        if school.get('slug') == slug:
            return school
    return None


@app.route('/')
def index():
    """Homepage with search interface"""
    return render_template('index.html')


@app.route('/school/<slug>')
def school_profile(slug: str):
    """Individual school profile page"""
    school = get_school_by_slug(slug)
    if not school:
        return render_template('404.html'), 404
    return render_template('school_profile.html', school=school)


@app.route('/api/schools')
def api_schools():
    """API endpoint to get all schools (for client-side filtering)"""
    return jsonify(schools_data)


@app.route('/api/search')
def api_search():
    """API endpoint for server-side search (optional, for future optimization)"""
    query = request.args.get('q', '').lower()
    state = request.args.get('state', '').upper()
    postal_code = request.args.get('postal_code', '')
    
    results = schools_data
    
    # Filter by query (name, city, state)
    if query:
        results = [
            s for s in results 
            if query in s.get('name', '').lower() or
               query in s.get('address', {}).get('city', '').lower() or
               query in s.get('address', {}).get('state', '').lower()
        ]
    
    # Filter by state
    if state:
        results = [s for s in results if s.get('address', {}).get('state') == state]
    
    # Filter by postal code
    if postal_code:
        results = [
            s for s in results 
            if s.get('address', {}).get('postalCode', '').startswith(postal_code)
        ]
    
    return jsonify(results)


@app.route('/api/states')
def api_states():
    """Get list of all states with school counts"""
    states = {}
    for school in schools_data:
        state = school.get('address', {}).get('state')
        if state:
            states[state] = states.get(state, 0) + 1
    
    # Convert to sorted list
    state_list = [{'code': code, 'count': count} for code, count in sorted(states.items())]
    return jsonify(state_list)


@app.errorhandler(404)
def not_found(e):
    """404 error handler"""
    return render_template('404.html'), 404


if __name__ == '__main__':
    load_schools()
    app.run(debug=True, host='0.0.0.0', port=5002)

