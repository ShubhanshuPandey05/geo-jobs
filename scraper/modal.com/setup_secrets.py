"""
Setup helper — creates the required Modal secret for the agent.

Run once:
    python setup_secrets.py

This creates a Modal secret named 'tavily-secret' containing your
TAVILY_API_KEY. The agent.py deployment references this secret.
"""

import subprocess
import sys
import os

# Try to load from .env file if it exists
ENV_FILE = os.path.join(os.path.dirname(__file__), "..", "..", ".env")

# Use `python -m modal` instead of bare `modal` CLI —
# on Windows the entry-point script isn't always on PATH for subprocess.
MODAL_CMD = [sys.executable, "-m", "modal"]


def load_env():
    """Load key=value pairs from .env file."""
    env = {}
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, _, value = line.partition("=")
                    env[key.strip()] = value.strip()
    return env


def main():
    env = load_env()
    tavily_key = env.get("TAVILY_API") or os.environ.get("TAVILY_API_KEY", "")

    if not tavily_key:
        tavily_key = input("Enter your Tavily API key: ").strip()

    if not tavily_key:
        print("❌ No Tavily API key provided. Aborting.")
        sys.exit(1)

    print("📦 Creating Modal secret 'tavily-secret'...")
    result = subprocess.run(
        [*MODAL_CMD, "secret", "create", "tavily-secret",
         f"TAVILY_API_KEY={tavily_key}"],
        capture_output=True,
        text=True,
    )

    if result.returncode == 0:
        print("✅ Secret 'tavily-secret' created successfully!")
    else:
        # Might already exist — try updating
        if "already exists" in result.stderr.lower():
            print("⚠️  Secret already exists. Updating...")
            result = subprocess.run(
                [*MODAL_CMD, "secret", "create", "tavily-secret",
                 f"TAVILY_API_KEY={tavily_key}", "--force"],
                capture_output=True,
                text=True,
            )
            if result.returncode == 0:
                print("✅ Secret updated!")
            else:
                print(f"❌ Failed: {result.stderr}")
        else:
            print(f"❌ Failed: {result.stderr}")

    print("\n🎯 Next steps:")
    print("   modal deploy agent.py     # Deploy to production")
    print("   modal run agent.py        # Run tests")
    print("   modal serve agent.py      # Dev mode with hot-reload")


if __name__ == "__main__":
    main()
