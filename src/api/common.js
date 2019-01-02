const certifiedPrefix = process.env.NODE_ENV !== 'production' ? 'test-certified/' : 'certified/'

module.exports = {
  checkCertifiedStatus: `${preUrlPath}/driver-center-api/attestation/record/new`,
  updateCertified: `${preUrlPath}/driver-center-api/attestation`,
  getCompanyInfoByUrl: `${preUrlPath}/driver-center-api/company/code`,
  certifiedPrefix
}
