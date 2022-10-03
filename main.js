let nameField = "entry.843663251";
let plusOneMain = "entry.406096887";
let attendance = "entry.484093843";
let food = "entry.111773816";
let rentals = "entry.1922830641";

const submitbtn = document.getElementById('submit');

function submit() {
  console.log('hit submit')
}


// <script>
//     $(function() {
//       $('#submit').on('click', function() {
//         if ()
//         // name
//         var name = $('#demo_name').val() || 'no set';

//         // gender
//         var gender = function() {
//           var v;
//           $('[name="demo_radio"]').each(function() {
//             if($(this).prop('checked') === true) v = $(this).val();
//           });
//           return v;
//         };

//         // category
//         var cat = $('#demo_select').val() || 'no set';

//         // question
//         var question = $('#demo_textarea').val() || 'no set';

//         // post
//         var data = {
//           'entry.2065974955': name,
//           'entry.1310259066': gender(),
//           'entry.896842914': cat,
//           'entry.1857722787': question
//         };
//         $.ajax({
//           type: 'POST',
//           url: 'https://docs.google.com/forms/d/e/1FAIpQLScxpBiexGfPha5_vq1fos2r_9dl1QfkCJBvHWHRIbgwudOHaQ/formResponse',
//           data: data,
//           contentType: 'application/json',
//           dataType: 'jsonp',
//           complete: function() {
//             alert('send success');
//           }
//         });
        
//       });
//     });
//   </script>