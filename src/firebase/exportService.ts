import { getAllRegistrations, type EventRegistrationData } from './eventService';

// Convert registrations to CSV format
export const exportRegistrationsToCSV = async (): Promise<string> => {
  try {
    const registrations = await getAllRegistrations();
    
    // CSV headers
    const headers = [
      'Registration ID',
      'Event Name',
      'Participant Name',
      'Email',
      'Phone',
      'Additional Info',
      'Status',
      'Registration Date'
    ];
    
    // Convert registrations to CSV rows
    const csvRows = registrations.map(reg => [
      reg.id,
      reg.eventName,
      reg.participantName,
      reg.participantEmail,
      reg.participantPhone,
      reg.additionalInfo,
      reg.status,
      reg.registrationDate.toDate().toLocaleString()
    ]);
    
    // Combine headers and rows
    const csvContent = [headers, ...csvRows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    return csvContent;
  } catch (error) {
    console.error('Error exporting registrations:', error);
    throw new Error('Failed to export registrations');
  }
};

// Download CSV file
export const downloadCSV = (csvContent: string, filename: string = 'event-registrations.csv'): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Export and download registrations
export const exportAndDownloadRegistrations = async (): Promise<void> => {
  try {
    const csvContent = await exportRegistrationsToCSV();
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `engineersday-registrations-${timestamp}.csv`;
    
    downloadCSV(csvContent, filename);
    console.log('Registrations exported successfully');
  } catch (error) {
    console.error('Error exporting registrations:', error);
    throw error;
  }
};
