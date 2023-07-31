import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PrivateLayout } from "../layouts/PrivateLayout";
import Admin from "../pages/Private/Admin";
const Contenido = lazy(() => import("../pages/Private/contenido/Contenido"));
const AddContenido = lazy(() =>
  import("../pages/Private/contenido/AddContenido")
);
const EditContenido = lazy(() =>
  import("../pages/Private/contenido/EditContenido")
);
import Uploads from "../pages/Private/uploads/Uploads";
import { PublicLayout } from "../layouts/PublicLayout";
import Home from "../pages/Public/Home";
import SinglePost from "../pages/Public/SinglePost";
import SectionUpload from "../pages/Private/uploads/SectionUpload";
import { Loader } from "../components/Loader";

const Imagenes = lazy(() => import("../pages/Private/uploads/Imagenes"));
const Pdf = lazy(() => import("../pages/Private/uploads/Pdf"));
const Comprimidos = lazy(() => import("../pages/Private/uploads/Comprimidos"));

const router = createBrowserRouter([
  {
    path: "/admin/",
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "contenido",
        element: (
          <Suspense fallback={<Loader/>}>
            <Contenido />
          </Suspense>
        ),
      },
      {
        path: "addcontenido",
        element: (
          <Suspense fallback={<Loader/>}>
            <AddContenido />
          </Suspense>
        ),
      },
      {
        path: "editcontenido/:id",
        element: (
          <Suspense fallback={<Loader/>}>
            <EditContenido />
          </Suspense>
        ),
      },
      {
        path: "uploads/",
        element: <Uploads />,
        children: [
          {
            path: "imagenes",
            element: (
              <Suspense fallback={<SectionUpload />}>
                <Imagenes />
              </Suspense>
            ),
          },
          {
            path: "pdf",
            element: (
              <Suspense fallback={<SectionUpload />}>
                <Pdf />
              </Suspense>
            ),
          },
          {
            path: "comprimidos",
            element: (
              <Suspense fallback={<SectionUpload />}>
                <Comprimidos />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/:id",
        element: <SinglePost />,
      },
    ],
  },
]);

export default router;
