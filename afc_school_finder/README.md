# AFC School Finder

A web application that enables potential donors to search for K-12 schools and make tax-credit eligible contributions through the Educational Choice for Children Act (ECCA) federal program.

## About ECCA

The Educational Choice for Children Act (ECCA) establishes the first federal scholarship tax credit program for K-12 education. Key features:

- **Tax Credit**: 100% dollar-for-dollar federal tax credit up to $1,700 per taxpayer per year
- **Eligibility**: Students from households with income ≤300% of area median gross income
- **Effective Date**: January 1, 2027
- **No Federal Cap**: Unlimited total credits available

## Features

- 🔍 **Advanced Search**: Search schools by name, state, or postal code
- 🏫 **Detailed Profiles**: Comprehensive school information including enrollment, demographics, contact info
- 🎨 **AFC Branding**: Clean, modern design matching American Federation for Children brand guidelines
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices
- ⚡ **Fast**: Client-side filtering for instant results

## Setup

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Process school data** (if not already done):
   ```bash
   python3 process_schools.py
   ```
   This converts the CSV data to JSON format (~15,000 schools).

3. **Run the application**:
   ```bash
   python3 app.py
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5001`

## Project Structure

```
afc_school_finder/
├── app.py                      # Flask application
├── process_schools.py          # CSV to JSON converter
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── static/
│   ├── data/
│   │   └── schools.json       # Processed school data
│   ├── style.css              # AFC-branded styles
│   ├── script.js              # Search and filtering logic
│   └── afc_logo.jpg           # AFC logo
└── templates/
    ├── index.html             # Homepage with search
    ├── school_profile.html    # School detail page
    └── 404.html               # Error page
```

## Data Source

School data sourced from `niche-nces-match.csv` containing:
- School names and locations
- Contact information
- Enrollment statistics
- Demographics
- Niche ratings

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Data**: Static JSON (15,467 schools)
- **Styling**: Custom CSS with AFC color scheme

## AFC Branding

- **Primary Blue**: #0052A5
- **Light Blue**: #4A90E2
- **White**: #FFFFFF
- **Gray Backgrounds**: #F5F5F5

## Routes

- `/` - Homepage with search interface
- `/school/<slug>` - Individual school profile
- `/api/schools` - JSON API for all schools
- `/api/search` - Search endpoint with filters
- `/api/states` - List of states with school counts

## Contributing to Schools

The "Send my contribution" button on each school profile links to:
`https://www.federationforchildren.org/`

This is where donors can complete their tax-credit eligible contributions.

## Development

To run in development mode with auto-reload:
```bash
python3 app.py
```

The app runs on port 5001 to avoid conflicts with other local services.

## License

Created for American Federation for Children (AFC)

## Support

For questions about the ECCA program, visit:
https://www.federationforchildren.org/

