import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { ru } from '@payloadcms/translations/languages/ru';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { getServerSideURL } from './utils/getURL';
import { Users } from './collections/Users';
import { Customers } from './collections/Customers';
import { BusinessProposals } from './collections/BusinessProposals/BusinessProposals';
import { BusinessProposalHistory } from './collections/BusinessProposalHistory';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      logout: {
        Button: '@/components/LogoutButton#LogoutButton',
      },
    },
  },
  collections: [Users, Customers, BusinessProposals, BusinessProposalHistory],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  i18n: {
    supportedLanguages: {
      ru,
    },
  },
  graphQL: {
    disable: true,
  },
  serverURL: getServerSideURL(),
  sharp,
  plugins: [],
});
