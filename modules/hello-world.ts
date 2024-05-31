import { HttpProblems, ZuploContext, ZuploRequest } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {

  const organizationId = request.params.organizationId;

  if (!organizationId) {
    return HttpProblems.notFound(request, context);
  }

  const response = await fetch('https://fcd2374caf84409b9dd81c6e0a9b27c1.api.mockbin.io/', {
    method: "POST",
    headers: request.headers,
    body: JSON.stringify({
      query: "get-org-id",
      organizationId
    })
  });

  const data = await response.json();

  data.forEach(item => {
    item.description = item.name;
    delete item.name
  });

  return new Response(JSON.stringify(data));

}
