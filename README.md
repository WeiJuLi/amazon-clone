# Amazon Clone

A full-stack e-commerce platform inspired by Amazon, built with React, Firebase, and Stripe.

## Features
- User authentication with Firebase.
- Real-time shopping cart updates.
- Secure payment processing with Stripe.
- Responsive design.

## Demo
![Demo GIF](https://your-link-to-gif.gif)

## Tech Stack
- **Frontend**: React
- **Backend**: Firebase Functions, Express
- **Database**: Firestore
- **Payment**: Stripe API
  
## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/amazon-clone.git
   ```
2. Install dependencies:
   ```bash
   cd amazon-clone
   npm install
    ```
3. Firebase Configuration
   This project requires Firebase configuration stored in a `.env` file.
   Please create a `.env` file in the root directory.

4. Start the development server:
   ```bash
   npm start
   ```

## Folder Structure
- `/src`: Contains the React components and CSS files.
- `/functions`: Firebase backend logic.

## Contributing
Contributions are welcome! Fork the repository and submit a pull request.

## References
This project is based on the tutorial by [Clever Programmer](https://www.youtube.com/c/CleverProgrammer).  
You can watch the original tutorial here: [Build an Amazon Clone with React, Firebase & Stripe](https://www.youtube.com/watch?v=RDV3Z1KCBvo).

The tutorial was published in 2021, and I have made the following updates to ensure compatibility with the latest versions of the libraries:

### Modifications
- **Stripe**: Migrated to `stripe@17.4.0` to support the latest API changes and improved error handling.
- **Firebase**: Replaced the deprecated Firebase SDK (`firebase@8.x`) with the modular Firebase SDK (`firebase@9.x+`), adjusting the initialization and query methods accordingly.
- **React Router**: Migrated from `react-router-dom@5.x` to `react-router-dom@6.x` and updated navigation logic (e.g., replaced `useHistory()` with `useNavigate()`).
- **Styling**: Improved CSS for better modern design aesthetics.


