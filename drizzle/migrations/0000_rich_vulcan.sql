CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(500) NOT NULL,
	"slug" varchar(500) NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"category" varchar(100),
	"tags" jsonb DEFAULT '[]'::jsonb,
	"author_id" uuid,
	"seo_title" varchar(255),
	"seo_description" varchar(500),
	"og_image" text,
	"cover_image" text,
	"source" varchar(20) DEFAULT 'db' NOT NULL,
	"read_time" integer DEFAULT 5 NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"icon" varchar(100),
	"color" varchar(20),
	"tool_count" integer DEFAULT 0 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"user_id" uuid NOT NULL,
	"tool_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "favorites_user_id_tool_id_pk" PRIMARY KEY("user_id","tool_id")
);
--> statement-breakpoint
CREATE TABLE "newsletters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"is_confirmed" boolean DEFAULT false NOT NULL,
	"confirmation_token" varchar(255),
	"confirmed_at" timestamp,
	"unsubscribed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "newsletters_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "prompt_favorites" (
	"user_id" uuid NOT NULL,
	"prompt_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "prompt_favorites_user_id_prompt_id_pk" PRIMARY KEY("user_id","prompt_id")
);
--> statement-breakpoint
CREATE TABLE "prompts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" integer NOT NULL,
	"title" varchar(500) NOT NULL,
	"content" text NOT NULL,
	"category" varchar(100) NOT NULL,
	"platform" varchar(100),
	"image_url" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"view_count" integer DEFAULT 0 NOT NULL,
	"copy_count" integer DEFAULT 0 NOT NULL,
	"like_count" integer DEFAULT 0 NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_trending" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_token" varchar(255) NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"short_description" varchar(500),
	"category" varchar(100) NOT NULL,
	"subcategory" varchar(100),
	"template_type" varchar(100) NOT NULL,
	"icon" varchar(100),
	"icon_color" varchar(20),
	"badge" varchar(50),
	"keywords" jsonb DEFAULT '[]'::jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"is_popular" boolean DEFAULT false NOT NULL,
	"usage_count" integer DEFAULT 0 NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"rating_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tools_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "usage_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"tool_id" uuid,
	"session_id" varchar(255),
	"action" varchar(50) NOT NULL,
	"metadata" jsonb,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"avatar" text,
	"plan" varchar(50) DEFAULT 'free' NOT NULL,
	"role" varchar(50) DEFAULT 'user' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prompt_favorites" ADD CONSTRAINT "prompt_favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prompt_favorites" ADD CONSTRAINT "prompt_favorites_prompt_id_prompts_id_fk" FOREIGN KEY ("prompt_id") REFERENCES "public"."prompts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_history" ADD CONSTRAINT "usage_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_history" ADD CONSTRAINT "usage_history_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blogs_category_idx" ON "blogs" USING btree ("category");--> statement-breakpoint
CREATE INDEX "blogs_published_idx" ON "blogs" USING btree ("is_published");--> statement-breakpoint
CREATE INDEX "blogs_featured_idx" ON "blogs" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "favorites_user_idx" ON "favorites" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "favorites_tool_idx" ON "favorites" USING btree ("tool_id");--> statement-breakpoint
CREATE INDEX "newsletters_email_idx" ON "newsletters" USING btree ("email");--> statement-breakpoint
CREATE INDEX "newsletters_confirmed_idx" ON "newsletters" USING btree ("is_confirmed");--> statement-breakpoint
CREATE INDEX "prompt_favorites_user_idx" ON "prompt_favorites" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "prompt_favorites_prompt_idx" ON "prompt_favorites" USING btree ("prompt_id");--> statement-breakpoint
CREATE UNIQUE INDEX "prompts_number_idx" ON "prompts" USING btree ("number");--> statement-breakpoint
CREATE INDEX "prompts_category_idx" ON "prompts" USING btree ("category");--> statement-breakpoint
CREATE INDEX "prompts_trending_idx" ON "prompts" USING btree ("is_trending");--> statement-breakpoint
CREATE INDEX "sessions_token_idx" ON "sessions" USING btree ("session_token");--> statement-breakpoint
CREATE INDEX "sessions_user_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "tools_slug_idx" ON "tools" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "tools_category_idx" ON "tools" USING btree ("category");--> statement-breakpoint
CREATE INDEX "tools_active_idx" ON "tools" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "tools_featured_idx" ON "tools" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "usage_history_user_idx" ON "usage_history" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "usage_history_tool_idx" ON "usage_history" USING btree ("tool_id");--> statement-breakpoint
CREATE INDEX "usage_history_session_idx" ON "usage_history" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "usage_history_created_at_idx" ON "usage_history" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "users_clerk_id_idx" ON "users" USING btree ("clerk_id");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");