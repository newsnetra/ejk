



// strike through

var _text = "";
var observer;

$(document).ready(function () {
  _text = $(".right.people").text();

  observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        StrikeThrough(0);
      }
    });
  });

  observer.observe($(".right.people")[0]);
});

function StrikeThrough(index) {
  if (index >= _text.length)
    return false;

  var sToStrike = _text.substr(0, index + 1);
  var sAfter = (index < (_text.length - 1)) ? _text.substr(index + 1, _text.length - index) : "";

  $(".right.people").html("<strike>" + sToStrike + "</strike>" + sAfter);

  window.setTimeout(function () {
    StrikeThrough(index + 1);
  }, 50);
}

// SVG graph tally animation


var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      var frames = entry.target.querySelectorAll("#frame1, #frame2, #frame3, #frame4, #frame5");
      frames.forEach(function (frame, index) {
        frame.style.animation = "dash 1s linear forwards";
        frame.style.animationDelay = (index + 1) + "s";
      });
    }
  });
});

var svgElement = document.querySelector(".svg_line");
observer.observe(svgElement);



// Enable hidden nav bar
{
  const nav = document.querySelector(".nav");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
      nav.classList.add("nav--hidden");
    } else {
      nav.classList.remove("nav--hidden");
    }
    lastScrollY = window.scrollY;
  });
}



/***************************************
Table STARTS
***************************************/

(function ($) {


  $(document).ready(function () {
    var table = $('#example').DataTable({
      "pageLength": 13, // or 14
      "lengthChange": false,
      select: true, // enable select extension
      searching: true,
      dom: 'lrtip', // Remove default search elements
      language: {
        info: ''
      },
      ajax: 'data.json',

      columns: [

        { data: 'name'},
        { data: 'agency' },
        { data: 'location' },
        { data: 'date' },
      ],
      columnDefs: [
        { targets: [1], orderable: true },
        { targets: '_all', orderable: true },
        {
          targets: 0,
          render: function (data, type, row, meta) {
            // console.log(row);
            return '<span class="arrow-icon"></span>     </span><span class="rowname">' + row.name + '</span>'   //<span class="status ' + row.status + '"></span> <span class="type_c ' + row.type + ' ">
          }
        }
      ],

      "order": [[3, 'desc']],

 

      drawCallback: function (settings) {
        var api = this.api();
        var pageInfo = api.page.info();
        var info = 'Showing ' + (pageInfo.start + 1) + ' to ' + pageInfo.end + ' of ' + pageInfo.recordsTotal + ' entries';
        if (api.search() && total > 0) {
          info += ' (filtered from ' + total + ' total entries)';
        }
        $('#searchResults').text(info);
      }

    });

    $('#myTable_search').on('keyup', function () {
      table.search(this.value).draw();
    });

    //  // Disable fourth column on screens below 600px
    //  if ($(window).width() < 600) {
    //   table.column(3).visible(false);
    // }

    // $(window).on('resize', function () {
    //   if ($(window).width() < 600) {
    //     table.column(3).visible(false);
    //   } else {
    //     table.column(3).visible(true);
    //   }
    // });


    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'tr', function () {
      var tr = $(this).closest('tr');
      var row = table.row(tr);

      if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
      } else {
        // Open this row
        row.child(format(row.data())).show();
        tr.addClass('shown');
      }
    });

    $('#filterSelect').on('change', function () {
      var selectedValue = $(this).val();
      if (selectedValue) {
        // Filter the table by the selected value
        $('#example').DataTable().column(1).search(selectedValue).draw();
      } else {
        // Remove any filters
        $('#example').DataTable().column(1).search('').draw();
      }
    });

  });


})(jQuery)
function format(data) {
  return (
    `<div class="info-container ${data.status}">
            <p>${data.description}</p>
            <p><span>Alleged or reported connotation: \xa0</span> ${data.connotation}</p>
            <p><span>Dominant identity: \xa0</span> ${data.identity}</p>
            <p><span>Reported by \xa0 </span> ${data.source}</p>
        </div>`
  );
}

/***************************************
Table ENDS
***************************************/
