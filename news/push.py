import subprocess

# Set the repository URL and local directory
repo_url = 'git@github.com:accademiafacile/spottedabafg.it.git'
local_dir = '/home/admin/Desktop/spottedabafg.it'

# Add the repository as a remote
subprocess.run(['git', 'remote', 'add', 'origin', repo_url], cwd=local_dir)

# Add all changes to the staging area
subprocess.run(['git', 'add', '.'], cwd=local_dir)

# Commit the changes with a commit message
commit_message = 'news update'
subprocess.run(['git', 'commit', '-m', commit_message], cwd=local_dir)

# Push the changes to the repository
subprocess.run(['git', 'push', 'origin', 'master'], cwd=local_dir)
