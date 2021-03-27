
# Colab - Let it run!
### A chrome extension to stop colab kernel from disconnecting due to being idle
When Training large datasets on Colab Notebook if the user leaves the screen idle i.e doesnt click on the notebook page, the kernel gets disconnects due to inactivity. This chrome extension helps to solve this issue.

## How to Install
	 1. Clone the repo
	 2. Open chrome://extensions/ in Chrome
	 3. Enable Developer Mode toggle on the Top right
	 4. Click on Load Unpacked Extension option and select the src folder.

## How To Use:
	1. Open your Colab notebook and connect to the runtime
	2. When you want to move away from your system and prevent disconnection, click on the Extension and click on the "ON" button.
	3. Once you are done and you want to stop Auto Disconnection, just click on the extension icon and click on "STOP" button

### Improvements
- User Interface Improvements
- Add timer to allow user to select idle interval
- Reconnect Kernel in case of crashes
- Notification sent once the running Colab cell is completed



