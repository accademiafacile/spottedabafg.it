import git
import watchdog
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time

class CommitPushHandler(FileSystemEventHandler):
    def on_modified(self, event):
        # Create a Git repository object
        repo = git.Repo("./")

        # Stage the news.html file for commit
        repo.index.add(["news.html"])

        # Create a commit with a message
        repo.index.commit("Updating news.html")

        # Push the commit to the repository's origin branch
        origin = repo.remote(name="origin")
        origin.push()

if __name__ == "__main__":
    event_handler = CommitPushHandler()
    observer = Observer()
    observer.schedule(event_handler, path="./", recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
