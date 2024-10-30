module.exports = (config, kernel) => {
  const x = {
    "win32": {
      "nvidia": `pip install torch torchvision torchaudio ${config.xformers ? 'xformers' : ''} --index-url https://download.pytorch.org/whl/cu124`,
      "amd": "pip install torch-directml",
      "cpu": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu"
    },
    "darwin": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu",
    "linux": {
      "nvidia": `pip install torch torchvision torchaudio ${config.xformers ? 'xformers' : ''} --index-url https://download.pytorch.org/whl/cu124`,
      "amd": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.0",
      "cpu": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu"
    }
  }
  if (config.torch) {
    if (kernel.platform === "darwin") {
      return x[kernel.platform]
    } else {
      return x[kernel.platform][kernel.gpu]
    }
  }
}
