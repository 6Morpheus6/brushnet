module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: [
        "git lfs install",
        "git clone https://huggingface.co/spaces/cocktailpeanut/BrushNet app",
      ]
    }
  }, {
    method: "script.start",
    params: {
      uri: "torch.js",
      params: {
        venv: "env",
        path: "app",
      }
    }
  }, {
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: [
        "uv pip install -r requirements.txt"
      ],
    }
  }, {
    method: "notify",
    params: {
      html: "Click the 'start' tab to get started!"
    }
  }]
}
