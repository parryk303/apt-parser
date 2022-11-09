import pptxgen from 'pptxgenjs'
import { COMPRESS, CUST_NAME } from './enums.js'
import { createMasterSlides } from './masters.js'
import { genSlides_Image } from './demo_image.js'
import { genSlides_Table } from './demo_table.js'
import { genSlides_Master } from './demo_master.js'

const DEPRECATED_TEST_MODE = false

// ==================================================================================================================

export function runEveryTest(pptxgen) {
  return execGenSlidesFuncs(
    ['Master', 'Chart', 'Image', 'Media', 'Shape', 'Text', 'Table'],
    pptxgen,
  )

  // NOTE: Html2Pptx needs table to be visible (otherwise col widths are even and look horrible)
  // ....: Therefore, run it manually. // if ( typeof table2slides1 !== 'undefined' ) table2slides1();
}

export function execGenSlidesFuncs() {
  // STEP 1: Instantiate new PptxGenJS object
  let pptx = new pptxgen()

  // STEP 2: Set Presentation props (as QA test only - these are not required)
  pptx.title = 'PptxGenJS Test Suite Presentation'
  pptx.subject = 'PptxGenJS Test Suite Export'
  pptx.author = 'Brent Ely'
  pptx.company = CUST_NAME
  pptx.revision = '15'

  // STEP 3: Set layout
  pptx.layout = 'LAYOUT_WIDE'

  // STEP 4: Create Master Slides (from the old `pptxgen.masters.js` file - `gObjPptxMasters` items)
  createMasterSlides(pptx)

  // STEP 5: Run requested test
  // genSlides_Image(pptx)
  // genSlides_Master(pptx)
  genSlides_Table(pptx)

  // LAST: Export Presentation
  return pptx.writeFile({
    fileName: `PptxGenJS_Demo__${new Date().toISOString().replace(/\D/gi, '')}`,
    compression: COMPRESS,
  })
}
