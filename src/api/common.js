const certifiedPrefix = process.env.NODE_ENV !== 'production' ? 'test-certified/' : 'certified/'

module.exports = {
  checkCertifiedStatus: `driver-center-api/attestation/record/new`,
  updateCertified: `driver-center-api/attestation`,
  getCompanyInfoByUrl: `driver-center-api/company/code`,
  certifiedPrefix
}
