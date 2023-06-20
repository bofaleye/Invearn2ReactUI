export const getInitials = (name: string): string => {
  const words = name.split(' ');

  const initials = words.map(word => word.charAt(0).toUpperCase());

  return initials.join('');
}

export const downloadCSV = (
  headers: any[],
  data: any[],
  filename: string
) => {
  const csvContent = convertArrayToCSV(headers, data);
  const blob = new Blob([csvContent], { type: 'text/csv' });

  const downloadLink = document.createElement('a');
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = filename;

  document.body.appendChild(downloadLink);
  downloadLink.click();

  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
};

const convertArrayToCSV = (headers: any[], array: any[]): string => {
  const csvRows = [];

  // Push the headers
  csvRows.push(headers.join(','));

  // Push the data
  array.forEach(item => {
    const values = headers.map(header => item[header]);
    csvRows.push(values.join(','));
  });

  return csvRows.join('\n');
};