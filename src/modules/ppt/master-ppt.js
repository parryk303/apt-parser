/* eslint-disable prettier/prettier */
import { STARLABS_LOGO_SM, WHITE_LOGO } from './media.js'

export function createMasterSlides(pptx, slideDetails) {
  // TITLE_SLIDE
  pptx.defineSlideMaster({
    title: 'TITLE_SLIDE',
    // background: objBkg,
    // bkgd: objBkg, // TEST: @deprecated
    background: { color: '49089e' }, // CORRECT WAY TO SET BACKGROUND COLOR
    objects: [
      { image: { x: 4.5, y: 3.0, w: 4, data: WHITE_LOGO } },
      { rect: { x: 0.0, y: 5.7, w: '100%', h: 0.75, fill: { color: 'F1F1F1' } } },
      {
        text: {
          text: slideDetails.title,
          options: {
            x: 0.0,
            y: 5.7,
            w: '100%',
            h: 0.75,
            fontFace: 'Arial',
            color: '363636',
            fontSize: 20,
            align: 'center',
            valign: 'middle',
            margin: 0,
          },
        },
      },
    ],
  })

  // MASTER_SLIDE (MASTER_PLACEHOLDER)
  pptx.defineSlideMaster({
    title: 'MASTER_SLIDE',
    background: { color: 'E1E1E1', transparency: 50 },
    margin: [0.5, 0.25, 1.0, 0.25],
    slideNumber: { x: 0.6, y: 7.1, color: 'FFFFFF', fontFace: 'Arial', fontSize: 10, bold: true },
    objects: [
      //   { image: { x: 11.45, y: 5.95, w: 1.67, h: 0.5, data: STARLABS_LOGO_SM } },
      {
        rect: { x: 0.0, y: 6.9, w: '100%', h: 0.6, fill: { color: '49089e' } },
      },
      {
        text: {
          options: {
            x: 0,
            y: 6.9,
            w: '100%',
            h: 0.6,
            align: 'center',
            valign: 'middle',
            color: 'FFFFFF',
            fontSize: 14,
          },
          text: 'Securonix',
        },
      },
      {
        placeholder: {
          options: {
            name: 'header',
            type: 'title',
            x: 0.6,
            y: 0.2,
            w: 12,
            h: 1.0,
            margin: 0,
            align: 'center',
            valign: 'middle',
            color: '404040',
            //fontSize: 18,
          },
          text: '', // USAGE: Leave blank to have powerpoint substitute default placeholder text (ex: "Click to add title")
        },
      },
      {
        placeholder: {
          options: { name: 'body', type: 'body', x: 0.6, y: 1.5, w: 12, h: 5.25, fontSize: 28 },
          text: '',
        },
      },
    ],
  })

  pptx.defineSlideMaster({
    title: 'MASTER_TWO_SLIDE',
    background: { color: 'E1E1E1', transparency: 50 },
    margin: [0.5, 0.25, 1.0, 0.25],
    slideNumber: { x: 0.6, y: 7.1, color: 'FFFFFF', fontFace: 'Arial', fontSize: 10, bold: true },
    objects: [
      //   { image: { x: 11.45, y: 5.95, w: 1.67, h: 0.5, data: STARLABS_LOGO_SM } },
      {
        rect: { x: 0.0, y: 6.9, w: '100%', h: 0.6, fill: { color: '49089e' } },
      },
      {
        text: {
          options: {
            x: 0,
            y: 6.9,
            w: '100%',
            h: 0.6,
            align: 'center',
            valign: 'middle',
            color: 'FFFFFF',
            fontSize: 14,
          },
          text: 'Securonix',
        },
      },
    ],
  })
}
