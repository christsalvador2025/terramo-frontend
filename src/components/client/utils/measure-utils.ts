export function categorizeMeasureGrading(measureGrading: { key: string }): string {
  const key = measureGrading.key;
  
  // Environmental measures (E- prefix)
  if (key.startsWith('E-')) {
    return 'Umwelt';
  }
  
  // Social measures (S- prefix)
  if (key.startsWith('S-')) {
    return 'Gesellschaft';
  }
  
  // Governance measures (G- prefix)
  if (key.startsWith('G-')) {
    return 'Wirtschaft';
  }
  
  // Fallback categorization based on common patterns
  const environmentalKeywords = [
    'klima', 'energie', 'emission', 'wasser', 'abfall', 'ressource',
    'umwelt', 'nachhaltig', 'co2', 'carbon', 'green'
  ];
  
  const socialKeywords = [
    'mitarbeiter', 'gesellschaft', 'sozial', 'menschenrecht', 'arbeitsplatz',
    'gesundheit', 'sicherheit', 'diversity', 'inklusion', 'gemeinschaft'
  ];
  
  const governanceKeywords = [
    'führung', 'governance', 'compliance', 'ethik', 'transparenz',
    'korruption', 'risiko', 'management', 'strategie', 'wirtschaft'
  ];
  
  const keyLower = key.toLowerCase();
  
  if (environmentalKeywords.some(keyword => keyLower.includes(keyword))) {
    return 'Umwelt';
  }
  
  if (socialKeywords.some(keyword => keyLower.includes(keyword))) {
    return 'Gesellschaft';
  }
  
  if (governanceKeywords.some(keyword => keyLower.includes(keyword))) {
    return 'Wirtschaft';
  }
  
  // Default fallback
  return 'Umwelt';
}