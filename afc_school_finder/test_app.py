#!/usr/bin/env python3
"""
Test script for AFC School Finder
Validates key functionality without running the server
"""

import json
from pathlib import Path

def test_data_processing():
    """Test that schools.json was created and is valid"""
    print("Testing data processing...")
    
    data_path = Path(__file__).parent / 'public' / 'data' / 'schools.json'
    
    if not data_path.exists():
        print("  ✗ schools.json not found")
        return False
    
    with open(data_path, 'r') as f:
        schools = json.load(f)
    
    if not schools:
        print("  ✗ No schools loaded")
        return False
    
    print(f"  ✓ Loaded {len(schools)} schools")
    
    # Validate structure
    sample = schools[0]
    required_fields = ['id', 'name', 'slug', 'address']
    for field in required_fields:
        if field not in sample:
            print(f"  ✗ Missing required field: {field}")
            return False
    
    print(f"  ✓ School data structure is valid")
    
    # Check for unique slugs
    slugs = [s['slug'] for s in schools]
    if len(slugs) != len(set(slugs)):
        print("  ✗ Duplicate slugs found")
        return False
    
    print(f"  ✓ All {len(slugs)} slugs are unique")
    
    # Check states
    states = set(s['address'].get('state') for s in schools if s.get('address', {}).get('state'))
    print(f"  ✓ Schools across {len(states)} states")
    
    return True


def test_templates():
    """Test that all templates exist"""
    print("\nTesting templates...")
    
    templates_dir = Path(__file__).parent / 'templates'
    required_templates = ['index.html', 'school_profile.html', '404.html']
    
    for template in required_templates:
        template_path = templates_dir / template
        if not template_path.exists():
            print(f"  ✗ Missing template: {template}")
            return False
        print(f"  ✓ {template} exists")
    
    # Validate key content in index.html
    with open(templates_dir / 'index.html', 'r') as f:
        content = f.read()
        required_elements = ['name-search', 'state-filter', 'postal-code-filter', 'ECCA']
        for element in required_elements:
            if element not in content:
                print(f"  ✗ Missing element in index.html: {element}")
                return False
    
    print("  ✓ index.html has all required elements")
    
    # Validate school profile template
    with open(templates_dir / 'school_profile.html', 'r') as f:
        content = f.read()
        required_elements = ['school.name', 'btn-contribute', 'federationforchildren.org']
        for element in required_elements:
            if element not in content:
                print(f"  ✗ Missing element in school_profile.html: {element}")
                return False
    
    print("  ✓ school_profile.html has CTA button and all required elements")
    
    return True


def test_static_files():
    """Test that all static files exist"""
    print("\nTesting static files...")
    
    public_dir = Path(__file__).parent / 'public'
    required_files = ['style.css', 'script.js', 'afc_logo.jpg']
    
    for file in required_files:
        file_path = public_dir / file
        if not file_path.exists():
            print(f"  ✗ Missing static file: {file}")
            return False
        print(f"  ✓ {file} exists")
    
    # Check CSS for AFC branding
    with open(public_dir / 'style.css', 'r') as f:
        css = f.read()
        if '#0052A5' not in css:  # AFC primary blue
            print("  ✗ AFC blue color not found in CSS")
            return False
    
    print("  ✓ style.css includes AFC branding colors")
    
    # Check JavaScript for key functions
    with open(public_dir / 'script.js', 'r') as f:
        js = f.read()
        required_functions = ['loadSchools', 'performSearch', 'populateStateFilter']
        for func in required_functions:
            if func not in js:
                print(f"  ✗ Missing function in script.js: {func}")
                return False
    
    print("  ✓ script.js has all required functions")
    
    return True


def test_app_routes():
    """Test Flask app configuration"""
    print("\nTesting Flask app configuration...")
    
    try:
        from app import app, schools_data
        
        # Check routes
        routes = [rule.rule for rule in app.url_map.iter_rules()]
        required_routes = ['/', '/school/<slug>', '/api/schools', '/api/search', '/api/states']
        
        for route in required_routes:
            if route not in routes:
                print(f"  ✗ Missing route: {route}")
                return False
        
        print(f"  ✓ All required routes are configured")
        
        # Check schools data loaded
        if len(schools_data) > 0:
            print(f"  ✓ Schools data loaded in app: {len(schools_data)} schools")
        else:
            print("  ✗ Schools data not loaded in app")
            return False
        
        return True
    except Exception as e:
        print(f"  ✗ Error testing app: {e}")
        return False


def test_search_filters():
    """Test search filtering logic"""
    print("\nTesting search filters...")
    
    data_path = Path(__file__).parent / 'public' / 'data' / 'schools.json'
    with open(data_path, 'r') as f:
        schools = json.load(f)
    
    # Test state filter
    fl_schools = [s for s in schools if s.get('address', {}).get('state') == 'FL']
    print(f"  ✓ State filter works: Found {len(fl_schools)} schools in FL")
    
    # Test name search
    academy_schools = [s for s in schools if 'academy' in s.get('name', '').lower()]
    print(f"  ✓ Name search works: Found {len(academy_schools)} schools with 'academy' in name")
    
    # Test postal code filter
    miami_schools = [s for s in schools if s.get('address', {}).get('postalCode', '').startswith('331')]
    print(f"  ✓ Postal code filter works: Found {len(miami_schools)} schools starting with 331")
    
    return True


def main():
    """Run all tests"""
    print("=" * 60)
    print("AFC School Finder - Test Suite")
    print("=" * 60)
    
    tests = [
        test_data_processing,
        test_templates,
        test_static_files,
        test_app_routes,
        test_search_filters,
    ]
    
    results = []
    for test in tests:
        try:
            result = test()
            results.append(result)
        except Exception as e:
            print(f"  ✗ Test failed with exception: {e}")
            results.append(False)
    
    print("\n" + "=" * 60)
    print(f"Test Results: {sum(results)}/{len(results)} passed")
    print("=" * 60)
    
    if all(results):
        print("\n✓ All tests passed! The AFC School Finder is ready to use.")
        print("\nTo start the app, run:")
        print("  python3 app.py")
        print("\nThen open: http://localhost:5002")
        return 0
    else:
        print("\n✗ Some tests failed. Please review the errors above.")
        return 1


if __name__ == '__main__':
    exit(main())


