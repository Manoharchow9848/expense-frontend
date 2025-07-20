document.getElementById('downloadBtn').addEventListener('click', async () => {
  const token = localStorage.getItem('token'); // or wherever your token is stored

  try {
    const res = await fetch('https://expense-backend-7df0.onrender.com/api/report/download', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error('Failed to download');
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    alert('Error downloading report');
    console.error(error);
  }
});
