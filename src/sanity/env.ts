export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-10";

export const dataset = assertValue(
    process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined || v === "") {
        // Log a warning but don't crash the build process
        // This allows the build to succeed so the user can then add the variables in the dashboard
        console.warn(`[Sanity Env Filter]: ${errorMessage}`);
        return v as T;
    }
    return v;
}
