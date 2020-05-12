exports.up = (pgm) => {
  pgm.createTable('moodjournalentries', {
    id: 'id',
    title: { type: 'varchar(1000)', notNull: true },
    mood: { type: 'varchar(30)', notNull: true},
    content: {type: 'text', notNull: true},
    date: {
      type: 'datetime',
      notNull: true,
      default: pgm.func('current_datetime'),
    },
  });
};