import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'tipsystores',

  projectId: '28ks49je',
  dataset: 'beauty_project',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
