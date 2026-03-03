export const REQUIREMENTS = [
  {
    id: 'highload',
    label: 'Высокая нагрузка (>1000 пользователей одновременно)',
  },
  {
    id: 'gosinteg',
    label: 'Интеграция с государственными системами (ЕСИА, реестры)',
  },
  {
    id: 'pd',
    label: 'Соответствие требованиям АТОС/Закону о ПДн',
  },
  {
    id: 'support',
    label: 'Техническая поддержка 24/7',
  },
] as const;

export const REQUIREMENTS_MAP = Object.fromEntries(
  REQUIREMENTS.map((req) => [req.id, req.label])
);
