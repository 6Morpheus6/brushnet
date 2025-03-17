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
      if (kernel.gpu === 'nvidia' && kernel.gpu_model && / 50.+/.test(kernel.gpu_model)) {
        return "pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128"
      } else {
        return x[kernel.platform][kernel.gpu]
      }
    }
  }
}
