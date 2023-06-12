import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { MyStyledLink } from "../../../components/MyStyledLink.js";
// import useSWRMutation for the PATCH
import useSWRMutation from "swr/mutation";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(place, event) {
    event.preventDefault();
    await trigger(place);
    router.push("/");
  }

  // destructure SWR Mutation into trigger
  const { trigger, isMutating } = useSWRMutation(
    `/api/places/${id}`,
    sendRequest
  );

  // define content to give to API route as wrapperfunction for fetch
  async function sendRequest(url, { arg }) {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // check response
    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  // Loading States
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  if (isMutating) {
    return <h1>Submitting your changes...</h1>;
  }

  return (
    <>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <MyStyledLink justifySelf="start">← back</MyStyledLink>
      </Link>
      <h2 id="edit-place">Edit Place</h2>

      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}
