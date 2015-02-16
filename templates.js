var templates = {};

templates.newlog = {
  "<h4><%= note %></h4>"
  "<li>",
  "<form>"
  "<input type="text" class="addNote" name="" value="<%= note %>",
  "</form>",
  "</li>",

}.join("");
