/* eslint-disable prettier/prettier */
export function genSlides_Master(pptx, slideDetails) {
  pptx.addSection({ title: 'Masters' })

  genSlide01(pptx)
  genSlide02(pptx, slideDetails)
  genSlide03(pptx, slideDetails)
  genSlide04(pptx, slideDetails)
}

function genSlide01(pptx) {
  let slide = pptx.addSlide({ masterName: 'TITLE_SLIDE', sectionTitle: 'Masters' })
}

function genSlide02(pptx, slideDetails) {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE', sectionTitle: 'Masters' })
  slide.addText('Selected Items', { placeholder: 'header' })
  slide.addText(slideDetails.data, { placeholder: 'body', valign: 'top' })
}

function genSlide03(pptx, slideDetails) {
  let slide = pptx.addSlide({ masterName: 'MASTER_TWO_SLIDE', sectionTitle: 'Masters' })
  // slide.addText('Total Coverage', { placeholder: 'header' })
  // slide.addImage({
  //   placeholder: 'body',
  //   data: slideDetails.image1,
  // })
  slide.addText('Total Coverage', {
    x: 1.13,
    y: 0.6,
    w: 5.5,
    h: 5.5,
    fontSize: 20,
    valign: 'top',
    align: 'center',
  })
  slide.addImage({
    x: 1.13,
    y: 1.5,
    w: 5.5,
    h: 4.5,
    data: slideDetails.image1,
  })
  slide.addText('Top 10 Techniques', {
    x: 6.9,
    y: 0.6,
    w: 5.5,
    h: 5.5,
    fontSize: 20,
    valign: 'top',
    align: 'center',
  })
  slide.addImage({
    x: 6.9,
    y: 1.5,
    w: 5.5,
    h: 4.5,
    data: slideDetails.image2,
  })
}

function genSlide04(pptx, slideDetails) {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE', sectionTitle: 'Masters' })
  slide.addText('Sankey Diagram', { placeholder: 'header' })
  slide.addImage({
    placeholder: 'body',
    data: slideDetails.image3,
  })
}
