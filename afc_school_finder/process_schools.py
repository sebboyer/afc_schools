#!/usr/bin/env python3
"""
Process niche-nces-match.csv and convert to schools.json
Generates URL-friendly slugs for school profile pages
"""

import csv
import json
import re
import ast
from pathlib import Path
from typing import Dict, Any, Optional


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug"""
    if not text or text == 'nan':
        return ''
    
    # Convert to lowercase
    text = str(text).lower()
    # Remove special characters and replace spaces with hyphens
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    # Remove leading/trailing hyphens
    text = text.strip('-')
    return text


def clean_value(value: Any) -> Optional[Any]:
    """Clean CSV values - convert 'nan' strings to None, strip whitespace"""
    if value is None or value == '' or str(value).lower() == 'nan':
        return None
    if isinstance(value, str):
        return value.strip()
    return value


def parse_dict_value(value: str) -> Optional[Any]:
    """Parse dictionary-like string values from CSV (e.g., '{1: 3}' or '{1: 'text'}')"""
    if not value or value == 'nan' or value == '':
        return None
    
    try:
        # Try to parse as a Python literal
        parsed = ast.literal_eval(value)
        if isinstance(parsed, dict):
            # Get the first value from the dictionary
            if parsed:
                return list(parsed.values())[0]
        return parsed
    except (ValueError, SyntaxError):
        # If parsing fails, return the original value
        return clean_value(value)


def parse_nested_dict(row: Dict[str, str], prefix: str) -> Dict[str, Any]:
    """Parse nested dictionary columns (e.g., {1: 'value1', 2: 'value2'})"""
    result = {}
    for key, value in row.items():
        if key.startswith(prefix):
            cleaned = clean_value(value)
            if cleaned:
                result[key] = cleaned
    return result


def extract_grade_range(lo_grade: Any, hi_grade: Any) -> str:
    """Extract readable grade range from numeric codes"""
    grade_map = {
        '-1': 'N/A',
        '1': 'N',
        '2': 'PK',
        '3': 'K',
        '4': '1',
        '5': '2',
        '6': '3',
        '7': '4',
        '8': '5',
        '9': '6',
        '10': '7',
        '11': '8',
        '12': '9',
        '13': '10',
        '14': '11',
        '15': '12',
        '16': '13',
        '17': 'Adult'
    }
    
    lo = clean_value(lo_grade)
    hi = clean_value(hi_grade)
    
    if not lo and not hi:
        return 'Not specified'
    
    lo_str = grade_map.get(str(int(float(lo))), 'N/A') if lo else 'N/A'
    hi_str = grade_map.get(str(int(float(hi))), 'N/A') if hi else 'N/A'
    
    if lo_str == hi_str:
        return lo_str
    return f"{lo_str} - {hi_str}"


def safe_int(value: Any) -> Optional[int]:
    """Safely convert value to integer"""
    try:
        if value is None or str(value).lower() == 'nan':
            return None
        return int(float(value))
    except (ValueError, TypeError):
        return None


def safe_float(value: Any) -> Optional[float]:
    """Safely convert value to float"""
    try:
        if value is None or str(value).lower() == 'nan':
            return None
        return round(float(value), 2)
    except (ValueError, TypeError):
        return None


def process_schools_csv(csv_path: str, output_path: str):
    """Process the niche-nces-match.csv file and create schools.json"""
    
    schools = []
    slugs_seen = {}
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            # Extract basic information
            school_name = clean_value(row.get('name'))
            if not school_name:
                continue
            
            # Generate unique slug
            base_slug = slugify(school_name)
            city = clean_value(row.get('address.addressLocality', ''))
            state = clean_value(row.get('address.addressRegion', ''))
            
            # Add city and state to slug for uniqueness
            if city and state:
                slug = f"{base_slug}-{slugify(city)}-{slugify(state)}"
            else:
                slug = base_slug
            
            # Ensure slug is unique
            if slug in slugs_seen:
                counter = slugs_seen[slug] + 1
                slugs_seen[slug] = counter
                slug = f"{slug}-{counter}"
            else:
                slugs_seen[slug] = 0
            
            # Parse complex fields
            lo_grade = parse_dict_value(row.get('LoGrade', ''))
            hi_grade = parse_dict_value(row.get('HiGrade', ''))
            total_enrollment = parse_dict_value(row.get('PSS_ENROLL_T', ''))
            county_name = parse_dict_value(row.get('PSS_COUNTY_NAME', ''))
            
            # Build school object
            school = {
                'id': clean_value(row.get('niche_id', '')),
                'name': school_name,
                'slug': slug,
                'alternateName': clean_value(row.get('alternateName[0]')),
                'description': clean_value(row.get('description')),
                
                # Address
                'address': {
                    'street': clean_value(row.get('address.streetAddress')),
                    'city': city,
                    'state': state,
                    'postalCode': clean_value(row.get('address.postalCode')),
                    'county': county_name if county_name and county_name != 'nan' else None,
                },
                
                # Contact
                'telephone': clean_value(row.get('telephone')),
                'website': clean_value(row.get('sameAs')),
                
                # School details
                'gradeRange': extract_grade_range(lo_grade, hi_grade),
                'totalEnrollment': safe_int(total_enrollment),
                
                # Niche rating
                'rating': {
                    'value': safe_float(row.get('aggregateRating.ratingValue')),
                    'count': safe_int(row.get('aggregateRating.reviewCount')),
                } if clean_value(row.get('aggregateRating.ratingValue')) else None,
                
                # Image
                'image': clean_value(row.get('image')),
            }
            
            schools.append(school)
    
    # Write to JSON
    output_dir = Path(output_path).parent
    output_dir.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(schools, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Processed {len(schools)} schools")
    print(f"✓ Written to {output_path}")
    
    # Print some statistics
    states = {}
    for school in schools:
        state = school['address']['state']
        if state:
            states[state] = states.get(state, 0) + 1
    
    print(f"✓ Schools across {len(states)} states")
    print(f"✓ Top 5 states: {sorted(states.items(), key=lambda x: x[1], reverse=True)[:5]}")


if __name__ == '__main__':
    csv_path = Path(__file__).parent.parent / 'niche-nces-match.csv'
    output_path = Path(__file__).parent / 'public' / 'data' / 'schools.json'
    
    print("Processing schools CSV...")
    process_schools_csv(str(csv_path), str(output_path))
    print("Done!")

