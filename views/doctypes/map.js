function(doc) {
  emit([doc.doctype, doc.created_at],doc);
}
