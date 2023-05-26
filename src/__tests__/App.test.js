import { describe, it, assert, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App js: init', () => {
  assert.exists(App)
  const wrapper = mount(App, {
    props: { } 
  })

  // textarea: ceramahSingkatIslam dan hasil
  const ceramahSingkatIslam = wrapper.find('[data-test="ceramah-singkat-islam"]')
  const results = wrapper.find('[data-test="results"]')

  // button: btnReset dan btnCopy
  const btnReset = wrapper.find('[data-test="btn-reset"]') 
  const btnCopy = wrapper.find('[data-test="btn-copy"]')

  // button: btnTweet
  const btnTweet = wrapper.find('[data-test="btn-tweet"]')

  it('init', () => {
    assert.isEmpty(ceramahSingkatIslam.element.value)
    assert.equal(ceramahSingkatIslam.element.focus(), undefined)

    assert.isEmpty(results.element.value)
    assert.isUndefined(btnReset.attributes().disabled)
    assert.equal(btnCopy.attributes().disabled, '')
    assert.equal(btnTweet.attributes().disabled, '')
  })
})

describe('App js: delete tweet youtube video', async() => {
  // textarea: ceramahSingkatIslam dan hasil
  const ceramahSingkatIslam = mount(App, {
    props: { } 
  }).find('[data-test="ceramah-singkat-islam"]')
  
  ceramahSingkatIslam.setValue('https://www.youtube.com/shorts/peUj47yc1xo')

  await ceramahSingkatIslam.trigger('change')

  assert.equal(ceramahSingkatIslam.element.value, '/shorts/peUj47yc1xo')
})