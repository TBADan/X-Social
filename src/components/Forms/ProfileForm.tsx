import { z } from "zod"
import { Models } from "appwrite"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"

import { PostValidation } from "@/lib/validation"
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext"
import FileUploader from "../shared/FileUploader"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"

import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type PostFormProps = {
  post?: Models.Document;
  action: 'Create' | 'Update'
}

const PostForm = ({ post, action }: PostFormProps) => {
  
  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
        file: [],
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio || "",
    },
  })
  
  //Query
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if(post && action === 'Update'){
      const updatedPost = await updatePost ({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      })
      if(!updatedPost) {
        toast({ title: '`post failed to update'})
      }
      return navigate(`/posts/${post.$id}`)
    }
    const newPost = await createPost({
      ...values,
      userId: user.id,
    })
    if(!newPost) {
      toast({
        title: 'New post fail'
      })
    }

    navigate('/')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <div className="flex flex-col gap-9 ">

        <div className="w-full">
        <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
            <FormItem>
            <FormLabel className="shad-form_label">Name</FormLabel>
            <FormControl>
                <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
            </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
            <FormItem>
            <FormLabel className="shad-form_label">Username</FormLabel>
            <FormControl>
                <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
            </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
            <FormItem>
            <FormLabel className="shad-form_label">Email</FormLabel>
            <FormControl>
                <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
            </FormItem>
        )}
        />
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" placeholder="This" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        </div>

        <div >
                <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="shad-form_label">Profile Photo</FormLabel>
                    <FormControl>
                        <FileUploader 
                        fieldChange={field.onChange}
                        mediaUrl={post?.imageUrl}
                        />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                    </FormItem>
                )}
                />

        </div>
        </div>
        
        
        

        <div className="flex gap-4 items-center justify-end">
        <Button 
        type="button" 
        className="shad-button_dark_4">
          Cancel
          </Button>


        <Button 
        type="submit"
        className="shad-button_primary whitespace-nowrap"
        disabled={isLoadingCreate || isLoadingUpdate}
        >
          {isLoadingCreate || isLoadingUpdate && 'Loading...'}
          {action} Post
          </Button>

        </div>
      </form>
    </Form>
  )
}

export default PostForm
