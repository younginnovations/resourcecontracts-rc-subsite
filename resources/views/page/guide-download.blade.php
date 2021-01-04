<!DOCTYPE html>
<html>
<head>
    <title>My Sample HTML file</title>
    <style type="text/css">
        #cars {
            border-collapse: collapse;
            width: 100%;
        }

        #cars td, #cars th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #cars tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        #cars tr:hover {
            background-color: #ddd;
        }

        #cars th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
<body>
<h1 style="font-size: 25px;color:royalblue">My Sample HTML File</h1>
<p style="color:red;font-size:20px;">
    My red text.
</p>
<p style="color:blue;font-size:20px;">
    My blue text.
</p>

<table id="cars">
    <tr>
        <th>Car Make</th>
        <th>Model</th>
    </tr>
    <tr>
        <td>Ford</td>
        <td>Focus</td>
    </tr>
    <tr>
        <td>Ford</td>
        <td>Mondeo</td>
    </tr>
    <tr>
        <td>Vauxhall</td>
        <td>Corsa</td>
    </tr>
    <tr>
        <td>Vauxhall</td>
        <td>Astra</td>
    </tr>
</table>


</body>
</html>