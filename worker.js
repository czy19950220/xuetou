self.onmessage = async ({ data }) => {
  const file = data.file;
  const CHUNK = 1024 * 1024;
  let offset = 0, logs = [], totalLines = 0;

  while (offset < file.size) {
    const slice = file.slice(offset, offset + CHUNK);
    const text = await slice.text();
    const lines = text.split('\n');
    // 逐行解析 …
    totalLines += lines.length;
    self.postMessage({ type: 'progress', processed: totalLines });
    offset += CHUNK;
  }

  self.postMessage({ type: 'result', logs });
};
