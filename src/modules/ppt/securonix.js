/* eslint-disable prettier/prettier */
export function genSlides_Securonix(pptx, slideDetails) {
  pptx.addSection({ title: 'Masters' })
  genSlide01(pptx)
  genSlide02(pptx, slideDetails)
  genSlide03(pptx, slideDetails)
  genSlide04(pptx, slideDetails)
  genSlide05(pptx, slideDetails)
  genSlide06(pptx, slideDetails)
  genSlide07(pptx, slideDetails)
  genSlide08(pptx, slideDetails)
  genSlide09(pptx, slideDetails)
  genSlideTable(pptx, 'MITRE Coverage - Functionality Centric', slideDetails.table1, [4, 4, 4])
  genSlideTable(pptx, 'Gap In Functionalities', slideDetails.table2, [6, 6])
}
function genSlide01(pptx) {
  let slide = pptx.addSlide({ masterName: 'TITLE_SLIDE', sectionTitle: 'Masters' })
}
function genSlide02(pptx, slideDetails) {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE', sectionTitle: 'Masters' })
  slide.addText('OOB Coverage', { placeholder: 'header' })
  slide.addImage({
    placeholder: 'body',
    data: slideDetails.image1,
  })
}
function genSlide03(pptx, slideDetails) {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE', sectionTitle: 'Masters' })
  slide.addText('Selected Items', { placeholder: 'header' })
  slide.addText(slideDetails.data, { placeholder: 'body', valign: 'top' })
}
function genSlide04(pptx, slideDetails) {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE', sectionTitle: 'Masters' })
  slide.addText('Coverage', { placeholder: 'header' })
  slide.addImage({
    placeholder: 'body',
    data: slideDetails.image2,
  })
}
function genSlide05(pptx, slideDetails) {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE', sectionTitle: 'Masters' })
  slide.addText('Tactics Coverage', { placeholder: 'header' })
  slide.addImage({
    placeholder: 'body',
    data: slideDetails.image3,
  })
}
function genSlide06(pptx, slideDetails) {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE', sectionTitle: 'Masters' })
  slide.addText('Top 10 Techniques', { placeholder: 'header' })
  slide.addImage({
    placeholder: 'body',
    data: slideDetails.image4,
  })
}
function genSlide07(pptx, slideDetails) {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE', sectionTitle: 'Masters' })
  slide.addText('MITRE Coverage - Tactic Centric', { placeholder: 'header' })
  slide.addImage({
    w: 9,
    placeholder: 'body',
    data: slideDetails.image5,
  })
}
function genSlide08(pptx, slideDetails) {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE', sectionTitle: 'Masters' })
  slide.addText('MITRE Coverage - Functionality Centric', { placeholder: 'header' })
  slide.addImage({
    w: 9,
    placeholder: 'body',
    data: slideDetails.image6,
  })
}
function genSlide09(pptx, slideDetails) {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE', sectionTitle: 'Masters' })
  slide.addText('Gap In Functionalities', { placeholder: 'header' })
  slide.addImage({
    placeholder: 'body',
    data: slideDetails.image7,
  })
}
function genSlideTable(pptx, title, arrRows, W = []) {
  let slide = pptx.addSlide({ sectionTitle: 'Masters' })
  slide.addText(
    [
      {
        text: title,
        options: { fontSize: 14, color: '0088CC', bold: true, breakLine: true },
      },
    ],
    {
      x: 0.23,
      y: 0.13,
      w: 8,
      h: 0.4,
    },
  )
  slide.addTable(arrRows, {
    x: 0.5,
    y: 0.5,
    w: 12,
    colW: W,
    border: { color: 'CFCFCF' },
    autoPage: true,
    autoPageRepeatHeader: true,
    verbose: false,
  })
}
export function genSlides_Insider(pptx, slideDetails) {
  pptx.addSection({ title: 'Masters' })
  genSlide01(pptx)
  genSlide10(pptx, slideDetails.image1, 'Insider Threat Coverage')
  genSlide10(pptx, slideDetails.image2, 'MITRE Coverage - Functionality Centric')
  genSlide10(pptx, slideDetails.image3, 'Gap In Functionalities - P1')
  genSlide10(pptx, slideDetails.image4, 'Gap In Functionalities - P2')
  genSlide10(pptx, slideDetails.image5, 'Gap In Functionalities - P3')
  genSlideTable(pptx, 'Gap In Functionalities - P1', slideDetails.table1, [6, 6])
  genSlideTable(pptx, 'Gap In Functionalities - P2', slideDetails.table2, [6, 6])
  genSlideTable(pptx, 'Gap In Functionalities - P3', slideDetails.table3, [6, 6])
}
function genSlide10(pptx, image, title) {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE', sectionTitle: 'Masters' })
  slide.addText(title, { placeholder: 'header' })
  slide.addImage({
    placeholder: 'body',
    data: image,
  })
}
export function genSlides_ITP(pptx, slideDetails) {
  pptx.addSection({ title: 'Masters' })
  genSlide01(pptx)
  genSlide10(pptx, slideDetails.image5, 'Insider Threat Coverage')
  genSlide10(pptx, slideDetails.image6, 'Priority 1')
  genSlide10(pptx, slideDetails.image7, 'Priority 2')
  genSlide10(pptx, slideDetails.image8, 'Priority 3')
  genSlide10(pptx, slideDetails.image1, 'ITP Planner')
  genSlide10(pptx, slideDetails.image2, 'ITP Coverage')
  genSlide10(pptx, slideDetails.image3, 'MITRE Coverage - Tactic Centric')
  genSlide10(pptx, slideDetails.image4, 'MITRE Coverage - Functionality Centric')
  genSlide10(pptx, slideDetails.image9, 'Gap In Functionalities - P1')
  genSlide10(pptx, slideDetails.image10, 'Gap In Functionalities - P2')
  genSlide10(pptx, slideDetails.image11, 'Gap In Functionalities - P3')
}
export function genSlides_UBA(pptx, slideDetails) {
  pptx.addSection({ title: 'Masters' })
  genSlide01(pptx)
  genSlide03(pptx, slideDetails)
  genSlide10(pptx, slideDetails.image1, 'Criticality')
  genSlide10(pptx, slideDetails.image2, 'Analytics Type')
  genSlide10(pptx, slideDetails.image3, 'Risk Threat / MITRE Techniques')
  genSlide10(pptx, slideDetails.image4, 'Functionality Distribution')
  genSlideTable(pptx, 'Policies', slideDetails.table1, [2, 4, 2, 4])
}
export function genSlides_Mitre_Reflector(pptx, slideDetails) {
  pptx.addSection({ title: 'Masters' })
  genSlide01(pptx)
  genSlide10(pptx, slideDetails.image1, 'MITRE Reflector')
  genSlide10(pptx, slideDetails.image2, 'Tactics Coverage')
  genSlide10(pptx, slideDetails.image3, 'Top 10 Techniques')
  genSlide10(pptx, slideDetails.image4, 'MITRE Coverage - Tactic Centric')
  genSlide10(pptx, slideDetails.image5, 'MITRE Coverage - Functionality Centric')
  genSlide10(pptx, slideDetails.image6, 'Gap In Functionalities')
  genSlide10(pptx, slideDetails.image7, 'Gap In All Techniques')
  genSlideTable(pptx, 'MITRE Coverage - Functionality Centric', slideDetails.table1, [4, 4, 4])
  genSlideTable(pptx, 'Gap In Functionalities', slideDetails.table2, [6, 6])
}
export function genSlides_PCI(pptx, slideDetails) {
  pptx.addSection({ title: 'Masters' })
  genSlide01(pptx)
  genSlide03(pptx, slideDetails)
  genSlide10(pptx, slideDetails.image1, 'PCI Planner Coverage')
  genSlide10(pptx, slideDetails.image2, 'PCI Planner')
  genSlide10(pptx, slideDetails.image3, 'PCI Coverage - Functionality Centric')
  genSlide10(pptx, slideDetails.image4, 'Gap In Functionalities')
}

export function genSlides_PCI_Ref(pptx, slideDetails) {
  pptx.addSection({ title: 'Masters' })
  genSlide01(pptx)
  genSlide10(pptx, slideDetails.image1, 'PCI Planner Coverage')
  genSlide10(pptx, slideDetails.image2, 'PCI Coverage - Functionality Centric')
  genSlide10(pptx, slideDetails.image3, 'Gap In Functionalities')
}
export function genSlides_ThreatModel(pptx, slideDetails) {
  pptx.addSection({ title: 'Masters' })
  genSlide01(pptx)
  genSlide03(pptx, slideDetails)
  genSlide10(pptx, slideDetails.image1, 'PCI Planner Coverage')
  genSlide10(pptx, slideDetails.image2, 'PCI Planner')
  genSlide10(pptx, slideDetails.image3, 'PCI Coverage - Functionality Centric')
  genSlide10(pptx, slideDetails.image4, 'Gap In Functionalities')
}

export function genSlides_ThreatModel_Ref(pptx, slideDetails) {
  pptx.addSection({ title: 'Masters' })
  genSlide01(pptx)
  genSlide10(pptx, slideDetails.image1, 'PCI Planner Coverage')
  genSlide10(pptx, slideDetails.image2, 'PCI Coverage - Functionality Centric')
  genSlide10(pptx, slideDetails.image3, 'Gap In Functionalities')
}