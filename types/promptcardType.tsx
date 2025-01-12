// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PromptCardProps {
    post: {
      prompt: string;
      creator: {
        _id: string | undefined;
        image: string;
        username: string;
        email: string;
      };
      tag: string;
    };
    handleTagClick?: (tag: string) => void; // Une fonction qui reçoit un tag en paramètre
    handleEdit?: () => void; // Fonction pour l'édition (facultative)
    handleDelete?: () => void; // Fonction pour la suppression (facultative)
  }
  