import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
import time

def create_session_with_retries():
    session = requests.Session()
    retries = Retry(total=5,
                    backoff_factor=0.1,
                    status_forcelist=[500, 502, 503, 504])
    session.mount('http://', HTTPAdapter(max_retries=retries))
    return session

def test_spam_detection(phone_number):
    url = "http://127.0.0.1:8000/predict"
    data = {"number": phone_number}
    session = create_session_with_retries()

    try:
        print(f"Sending request for number: {phone_number}")
        response = session.post(url, json=data, timeout=10)
        response.raise_for_status()
        
        result = response.json()
        print("\nSpam Detection Results:")
        print("-" * 30)
        print(f"Number: {result['number']}")
        print(f"Prediction: {result['prediction']}")
        print(f"Spam Probability: {result['probability']}")
        print(f"Risk Level: {result['risk_level']}")
        print("-" * 30)
        
    except requests.exceptions.ConnectionError as e:
        print(f"Connection Error: {str(e)}")
    except requests.exceptions.Timeout as e:
        print(f"Timeout Error: {str(e)}")
    except requests.exceptions.RequestException as e:
        print(f"Error: {str(e)}")

# Test with different numbers
test_numbers = [
    "1408765432",  # Potential spam number
    "9876543210",  # Regular number
    "abc"          # Invalid input
]

# Add delay between requests
for number in test_numbers:
    print(f"\nTesting number: {number}")
    test_spam_detection(number)
    time.sleep(1)  # Wait 1 second between requests
