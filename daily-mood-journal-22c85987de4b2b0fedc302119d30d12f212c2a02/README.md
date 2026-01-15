📖 MoodJournal AI
MoodJournal AI is a local web application built with Streamlit that serves as a smart personal diary. It allows users to document their daily thoughts, automatically analyzes the emotional tone of their entries using Natural Language Processing (AI), tracks mood trends over time, and provides daily motivation.
✨ Features
 * 📝 Daily Journaling: A clean, distraction-free interface to write and save daily journal entries.
 * 🧠 AI Mood Detection: Automatically analyzes the sentiment of your text (Positive, Negative, Neutral) using NLP techniques.
 * 📊 Interactive Mood Charts: Visualizes your emotional trends over time using interactive line and pie charts.
 * ✨ Daily Motivation: Displays a curated motivational quote to uplift your spirits based on your interaction.
 * 🔒 Local Data Storage: All data is saved locally (CSV/SQLite), ensuring your private thoughts stay on your machine.
🛠️ Tech Stack
 * Language: Python 3.8+
 * Framework: Streamlit (Web UI)
 * Data Manipulation: Pandas
 * Natural Language Processing: TextBlob or NLTK (VADER)
 * Visualization: Plotly or Altair
🚀 Installation & Setup
Follow these steps to get the project running on your local machine.
1. Clone the Repository
cd moodjournal-ai
2. Create a Virtual Environment (Recommended)
It is best practice to use a virtual environment to manage dependencies.
Windows:
python -m venv venv
venv\Scripts\activate

macOS/Linux:
python3 -m venv venv
source venv/bin/activate

3. Install Dependencies
Install the required Python packages listed in the requirements file.
pip install -r requirements.txt

> Note: If you do not have a requirements.txt yet, your core dependencies will likely be:
> streamlit pandas textblob plotly
> 
4. Run the Application
Launch the Streamlit server.
streamlit run app.py

The app should automatically open in your default web browser.
📂 Project Structure
Here is the recommended folder structure for this application:
moodjournal-ai/
├── .streamlit/
│   └── config.toml      # Streamlit theme configuration
├── data/
│   └── journal.csv      # Local database for entries
├── src/
│   ├── mood_analyzer.py # Logic for AI sentiment analysis
│   └── utils.py         # Helper functions (date formatting, quotes)
├── app.py               # Main application entry point
├── requirements.txt     # Python dependencies
└── README.md            # Project documentation

📖 Usage Guide
 * Write: Navigate to the "New Entry" tab. Select the date and type your thoughts into the text area. Click "Save Entry."
 * Analyze: The AI will instantly calculate a polarity score (-1 to +1) for your entry.
 * Track: Switch to the "Dashboard" tab to see a graph of how your mood has fluctuated over the week or month.
 * Inspire: Check the sidebar or footer for your daily motivational quote.
🔮 Future Roadmap
 * [ ] User Authentication (Login/Signup).
 * [ ] Advanced AI (OpenAI/Gemini API integration) for deeper psychological insights.
 * [ ] Export data to PDF.
 * [ ] Calendar view for entries.
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
 * Fork the project
 * Create your feature branch (git checkout -b feature/AmazingFeature)
 * Commit your changes (git commit -m 'Add some AmazingFeature')
 * Push to the branch (git push origin feature/AmazingFeature)
 * Open a Pull Request
