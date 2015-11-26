tinymce.init({
  selector: "textarea",
  theme: "modern",
  width: 700,
  height: 300,
  browser_spellcheck : true,
  fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt",
  plugins: [
    "advlist autolink link image lists charmap  hr anchor pagebreak",
    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
    "save table contextmenu directionality template paste textcolor colorpicker"
  ],
  content_css: "css/content.css",
  toolbar: "insertfile undo redo | styleselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image |  media fullpage | forecolor backcolor",
});