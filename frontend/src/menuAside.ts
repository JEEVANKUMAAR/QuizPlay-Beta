import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/questions/questions-list',
    label: 'Questions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiHelpCircleOutline' in icon ? icon['mdiHelpCircleOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_QUESTIONS'
  },
  {
    href: '/quizzes/quizzes-list',
    label: 'Quizzes',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiClipboardList' in icon ? icon['mdiClipboardList' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_QUIZZES'
  },
  {
    href: '/results/results-list',
    label: 'Results',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiChartBar' in icon ? icon['mdiChartBar' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_RESULTS'
  },
  {
    href: '/parties/parties-list',
    label: 'Parties',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_PARTIES'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
