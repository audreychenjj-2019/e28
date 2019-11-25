Project 3
By: Jiajia Chen
Product URL: http://p3.acjj.me

Outside resources
To get stock information I use the open API data here.
https://financialmodellingprep.com,
https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fc91a66d03df4616b61b5b245a51fb7d

To build my AutoComplete component I followed steps in this page
https://alligator.io/vuejs/vue-autocomplete-component/ then edited to customize for my needs.

To build the format function in my ShowProfile component I used some techniques mentioned in this page.
https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900

Notes for instructor

Made design decision to use live API for all core use-cases of p3 to ensure scalability.

For 2 use-cases of relatively static data (symbol search & company metrics) mock API error

- maxContentLength size of 10000 exceeded.
  To meet p3 requirement, added Index Component lookup from Mock API on Research page, e.g. search MSFT
