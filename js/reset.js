function clean_table(){
    let standard = "<tr>\n" +
        "   <td>X</td>" +
        "   <td>Y</td>" +
        "   <td>R</td>" +
        "   <td>Current time</td>" +
        "   <td>Execution time</td>" +
        "   <td>Result</td>" +
        "    </tr>"

    $('#history_table').html(standard);
}