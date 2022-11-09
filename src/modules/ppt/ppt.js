/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import pptxgen from 'pptxgenjs'
import { COMPRESS, CUST_NAME } from './enums'
import { createMasterSlides } from './master-ppt'
import { genSlides_Master } from './miter'
import {
  genSlides_Securonix,
  genSlides_Insider,
  genSlides_ITP,
  genSlides_UBA,
  genSlides_Mitre_Reflector,
  genSlides_PCI,
  genSlides_PCI_Ref,
  genSlides_ThreatModel,
  genSlides_ThreatModel_Ref
} from './securonix'
// import { genSlides_Image } from './demo_image.js'
export function execGenSlidesFuncs(slideDetails, type = '') {
  let pptx = new pptxgen()
  pptx.title = 'PptxGenJS Test Suite Presentation'
  pptx.subject = 'PptxGenJS Test Suite Export'
  pptx.author = 'Brent Ely'
  pptx.company = CUST_NAME
  pptx.revision = '15'
  pptx.layout = 'LAYOUT_WIDE'
  createMasterSlides(pptx, slideDetails)
  // genSlides_Image(pptx)
  if (type === 'securonix') {
    genSlides_Securonix(pptx, slideDetails)
  } else if (type === 'insider') {
    genSlides_Insider(pptx, slideDetails)
  } else if (type === 'ipt') {
    genSlides_ITP(pptx, slideDetails)
  } else if (type === 'uba') {
    genSlides_UBA(pptx, slideDetails)
  } else if (type === 'mitre-reflector') {
    genSlides_Mitre_Reflector(pptx, slideDetails)
  } else if (type === 'pciplanner') {
    genSlides_PCI(pptx, slideDetails)
  } else if (type === 'pcireflector') {
    genSlides_PCI_Ref(pptx, slideDetails)
  } else if (type === 'threatmodelplanner') {
    genSlides_ThreatModel(pptx, slideDetails)
  } else if (type === 'threatmodelreflector') {
    genSlides_ThreatModel_Ref(pptx, slideDetails)
  } else {
    genSlides_Master(pptx, slideDetails)
  }
  return pptx.writeFile({
    fileName: `${slideDetails.fileName}__${new Date().toISOString().replace(/\D/gi, '')}`,
    compression: COMPRESS,
  })
}
