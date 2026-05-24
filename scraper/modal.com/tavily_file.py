from tavily import TavilyClient

tavily = TavilyClient(api_key=fromenv)

def search_company(company: str):
    return tavily.search(
        query=f"{company} careers",
        max_results=5
    )
# Example Run
# print(search_company("Datadog"))