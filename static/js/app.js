// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    console.log(metadata);

    // Filter the metadata for the object with the desired sample number
    let array = metadata.filter(sample_object => sample_object.id == sample);
    let result = array[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.\
    for (id in result) {
      panel.append("h6").text(`${id}: ${result[id]}`);
  };
});
}


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;
    console.log("Samples:", samples);

    // Filter the samples for the object with the desired sample number
    let array = samples.filter(sample_object => sample_object.id == sample);
    let result = array[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;
    console.log("OTU IDs:", otu_ids);
    console.log("OTU Labels:", otu_labels);
    console.log("Sample Values:", sample_values);

    // Build a Bubble Chart
    let trace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
      }
    };

    let Bubble_data = [trace];
    let Bubble_layout = {
      title: "Bacteria Cultures Per Sample",
      showlegend: false,
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Number of Bacteria" }
    };
    console.log("Bubble Chart Data:", Bubble_data); // Log the bubble chart data
    console.log("Bubble Chart Layout:", Bubble_layout); // Log the bubble chart layout
    
    // Render the Bubble Chart
    Plotly.newPlot("bubble", Bubble_data, Bubble_layout);
    


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let xticks = sample_values.slice(0,10).reverse();
    let yticks = otu_ids.slice(0,10).map(id=> `OTU ${id}`).reverse();
    let labels = otu_labels.slice(0,10).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let trace2 = {
      x : xticks,
      y : yticks,
      text : labels,
      type: "bar",
      orientation: "h"
    };

    let Bar_data = [trace2]

    let Bar_layout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {'title': "Number of bacteria"},

    }
    // Render the Bar Chart
    Plotly.newPlot("bar", Bar_data, Bar_layout);

    // Render the Bar Chart
    Plotly.newPlot("bar", Bar_data, Bar_layout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names_field = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let select_names = d3.select("#selDataset");

      // Use the list of sample names to populate the select options
      // Hint: Inside a loop, you will need to use d3 to append a new
      // option for each sample name
    
    for (let id = 0; id < names_field.length; id++) {
      select_names.append("option").text(names_field[id]).property("value", names_field[id])};

      // Build charts and metadata panel with the first sample
      buildMetadata(names_field[0]);
      buildCharts(names_field[0]);
  });
}


// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(array);
  buildCharts(array);

};

// Initialize the dashboard
init();
