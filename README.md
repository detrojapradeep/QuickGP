# QuickGP

QuickGP is a simple web service and Telegram bot for managing and viewing appointments. The web service allows users to add appointments, while the Telegram bot enables users to view and select appointments.

## Prerequisites

1. Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/)


2. Install dependencies:
    ```bash
    npm install
    ```

## Running the Web Service

3. To start the web service, run:
    ```bash
    npm run start
    ```
    The web service will be available at http://localhost:5500

## Running the Telegram Bot

4. To start the Telegram bot, run:
    ```bash
    npm run bot
    ```

    Make sure to replace YOUR_TELEGRAM_BOT_API_TOKEN in bot.js with your actual Telegram bot token obtained from BotFather


## Usage

1. Adding Appointments:
    - Open your browser and go to http://localhost:5500.  
    - Fill in the appointment form and submit it. The appointment will be saved to appointments.txt.

2. Viewing Appointments via Telegram:
    - Telegram and search for your bot.  
    - Send the message show appointments to the bot.  
    - The bot will display a list of available appointments with inline buttons for selection.  



