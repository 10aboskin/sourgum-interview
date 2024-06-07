## About

An application that displays current currency/asset exchange rates.

### Data Fetching

- Leveraging `react-query`, the application optimizes API requests and caches responses. To prevent exceeding the API rate limit, request retries are disabled and a stale time of `Infinity` is set. Exchange rate data is fetched from the `/exchangerate` endpoint. Virtualization techniques are employed to enhance performance, enabling smooth scrolling and efficient search functionality even with large response sizes.

### Search/Filter

- Utilizing Fuse.js, users can conduct a fuzzy search across the exchange rate list, improving accessibility and usability.

### Asset Details

- When a list item is selected, detailed asset information is fetched from the `/assets` endpoint. This information is then presented alongside the exchange rate list.

### Comparing Assets

- The 'Base Asset' select option allows users to choose a base currency for comparing exchange rates. By selecting a base asset and utilizing the search feature, users can effectively analyze exchange rate differentials.

### Testing

- Due to time constraints, an integration test strategy was favored over unit testing to ensure the application's robustness and reliability.

### Styling

- Tailwind CSS is employed for styling purposes. While styling was given due consideration, time limitations may have impacted the depth of styling enhancements achieved in the project. Future iterations may involve further refinement in this area.