export const calculateAge = (dobString) => {
  if (!dobString) return '';
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return '';
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

export const convertToCm = (ft, inc) => {
  const feet = parseInt(ft, 10) || 0;
  const inches = parseInt(inc, 10) || 0;
  return Math.round((feet * 30.48) + (inches * 2.54));
};
