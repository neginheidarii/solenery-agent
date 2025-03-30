# solenery-agent
Property Details App
Welcome to the **Property Details App**! 🏡 This web application allows you to quickly view detailed property information by entering the postal code using the **Attom API** and view utility usage data with the **WattBuy API**.

Built with **React**, **Vite**, and **Node.js**, this app is a sleek, modern tool for those who need property insights and utility data at their fingertips.

**Quick view:**

<img width="1334" alt="Screenshot 2025-03-29 at 10 44 34 PM" src="https://github.com/user-attachments/assets/5765145c-6863-45c0-8039-3e885c1b181c" />
**Search by postal code:**
<img width="1201" alt="Screenshot 2025-03-29 at 10 45 26 PM" src="https://github.com/user-attachments/assets/ee984be9-258b-4555-a140-5e97e1966b21" />
**Energy usage calculation::**
<img width="1204" alt="Screenshot 2025-03-29 at 10 46 09 PM" src="https://github.com/user-attachments/assets/0bfc97d2-0202-42bf-9d23-83d15159ab2d" />
**Error message:**
<img width="1072" alt="Screenshot 2025-03-29 at 10 47 55 PM" src="https://github.com/user-attachments/assets/272dc82d-8575-48d8-a6db-9e73db41e46a" />

🚀 Tech Stack
- **Frontend:** React, Vite – Fast, responsive, and modern web development.
- **Backend:** Node.js – A robust backend for handling API requests.
- **APIs/Services:**
  - **Attom API:** [Attom Property API](https://api.developer.attomdata.com/docs#!/14632Area32Boundary32Detail/getBoundary) - Get detailed property profiles by providing an address.
  - **WattBuy API:** [WattBuy Utility API](https://wattbuy.readme.io/reference/getting-started-with-your-api) - Access utility usage data to understand energy consumption patterns.
🎯 Features
- **Property Details:** Simply enter an address to retrieve detailed property information.
- **Utility Data:** Get utility usage insights to make informed decisions about energy consumption.
⚙️ Setup Instructions
Ready to get started? Just follow these simple steps:
1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/neginheidarii/solenery-agent.git
cd solenery-agent
```
2. Install Dependencies
Run the following command to install all the necessary packages:
```bash
npm install
```
3. Configure Your Environment
Create a `.env` file in the root directory and add your API keys:
```env
VITE_PROPERTY_KEY=your-attom-api-key
VITE_WATTBUY_KEY=your-wattbuy-api-key
```
- **Attom API Key:** You can get your API key from the [Attom Developer Portal](https://developer.attomdata.com/).
- **WattBuy API Key:** Sign up and grab your key from [WattBuy](https://wattbuy.readme.io/).
4. Run the Development Server
Now you’re all set! Start the app by running:
```bash
npm run dev
```
The app will be up and running locally at [http://localhost:3000](http://localhost:3000).
🧪 Running Tests
To ensure everything is working as expected, run the tests with:
```bash
npm run test
```
💡 Notes on Limitations and Assumptions
- **API Key Required:** Both Attom and WattBuy APIs require valid API keys to function. Be sure to generate and add them to your `.env` file.
- **Address Format:** Ensure the addresses entered are well-formed. The Attom API is quite sensitive to address formatting, so make sure they’re complete and valid for accurate results.
- **API Rate Limits:** Both APIs may have rate limits. Please monitor your usage and stay within the specified limits to avoid disruptions in service.
- **CORS Issues:** If you're using this app directly from your browser, you might face CORS-related issues. You can easily resolve this by setting up a proxy or using a backend to relay the requests.
- **Utility Data Availability:** WattBuy’s utility data is only available for specific regions and properties. Not all properties may have utility usage data.
🛠️ Next Steps and Features
We’re always looking to improve! Here are some ideas for what’s next:
- **Enhanced Error Handling:** Make the app even more user-friendly with detailed, helpful error messages.
- **UI/UX Enhancements:** We plan to improve the design, making it even more intuitive with features like loading spinners, interactive maps, and more.
- **Saved Searches:** Add the ability to save your searches and view them later.
- **Smarter search:** Search by address and adding smarter search ability.
- **More Data:** Integrate additional APIs for richer property details, including images, pricing trends, and neighborhood insights.


🌐 Live Deployment
Excited to see it in action? Check out the live version of the app here: [Live Demo](https://solenery-agent-ot9v.vercel.app/).


📜 License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
Thank you for checking out the Property Details App! If you have any questions, suggestions, or contributions, feel free to open an issue or submit a pull request. Let’s build something great together! 🚀
