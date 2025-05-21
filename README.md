# 🏁 DRS Zone

**DRS Zone** is a cross-platform mobile application providing real-time insights into Formula 1 racing. Stay up to date with race schedules, current standings, constructor rankings, and detailed race results — all in one place.

---

## 📦 Tech Stack

- **Framework**: React Native (TypeScript)
- **Navigation**: React Navigation
- **State Management**: Redux Toolkit
- **Networking**: Axios
- **Backend API**: [F1 API](https://f1api.dev/docs/teams)
- **UI Enhancements**: Expo, Expo AV, Linear Gradient

---

## 📱 Platforms

- Android
- iOS

---

## 🚀 Getting Started

Clone the repository and install dependencies to get started:

```bash
git clone https://github.com/your-username/drs-zone.git
cd drs-zone
npm install
npx expo start

This app uses data from F1 API( https://f1api.dev/docs/teams ). No authentication key is required for public endpoints.


## 🖼️ Screenshots

| Screen | Description |
|--------|-------------|
| ![Intro](./ScreenShots/IntroScreen.png) | **Intro Screen**<br/>App splash and welcome screen |
| ![Current Week](./ScreenShots/CurrentWeekInfoScreen.png) | **Current Week Info**<br/>Displays details of the current race week including circuit, date, and session times |
| ![Schedule](./ScreenShots/ScheduleScreen.png) | **Schedule**<br/>Complete season calendar with upcoming and past races |
| ![Driver Standings](./ScreenShots/DriverStandingsScreen.png) | **Driver Standings**<br/>Live leaderboard of F1 drivers with points and ranks |
| ![Constructor Standings](./ScreenShots/ConstructorsStandingsScreen.png) | **Constructor Standings**<br/>Team rankings throughout the season |
| ![Race Details 1](./ScreenShots/RaceDetailsScreen1.png) | **Race Details - 1**<br/>Detailed overview of a selected race including position, driver stats, and laps |
| ![Race Details 2](./ScreenShots/RaceDetailsScreen2.png) | **Race Details - 2**<br/>Additional insights such as fastest lap, pit stops, and highlights |
